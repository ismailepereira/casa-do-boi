import "server-only";

/**
 * Coordenadas de um CEP, usadas para medir a distância até a loja e escolher
 * a faixa da tabela de frete rodoviário.
 *
 * Fonte: BrasilAPI (gratuita, sem chave). Nem todo CEP tem coordenada — quando
 * não tiver, quem chama trata como "não deu para calcular" e manda o cliente
 * para o WhatsApp, em vez de chutar um valor.
 */

export type Coordenada = { latitude: number; longitude: number };

const cache = new Map<string, Coordenada | null>();

export async function coordenadaDoCep(cepBruto: string): Promise<Coordenada | null> {
  const cep = cepBruto.replace(/\D/g, "");
  if (cep.length !== 8) return null;
  if (cache.has(cep)) return cache.get(cep) ?? null;

  try {
    const resposta = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`, {
      // O CEP não muda de lugar; um dia de cache é de sobra.
      next: { revalidate: 86400 },
    });
    if (!resposta.ok) {
      cache.set(cep, null);
      return null;
    }

    const dados = (await resposta.json()) as {
      location?: { coordinates?: { latitude?: string; longitude?: string } };
    };
    const c = dados.location?.coordinates;
    const latitude = Number(c?.latitude);
    const longitude = Number(c?.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      cache.set(cep, null);
      return null;
    }

    const coord = { latitude, longitude };
    cache.set(cep, coord);
    return coord;
  } catch {
    cache.set(cep, null);
    return null;
  }
}

/** Distância em linha reta entre dois pontos, em km (fórmula de Haversine). */
export function distanciaKm(a: Coordenada, b: Coordenada): number {
  const R = 6371;
  const rad = (g: number) => (g * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Distância rodoviária estimada. A linha reta subestima muito o trajeto real
 * na Amazônia, onde a estrada contorna rio e floresta — o fator 1,45 aproxima
 * o percurso da Transamazônica.
 */
export function distanciaRodoviariaKm(a: Coordenada, b: Coordenada): number {
  return distanciaKm(a, b) * 1.45;
}
