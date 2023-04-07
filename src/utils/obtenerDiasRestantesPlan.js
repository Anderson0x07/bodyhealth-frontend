
export function obtenerDiferenciaDias(fecha_fin) {
    const fechaMilisegundos = Date.parse(fecha_fin);

    const hoyMilisegundos = Date.now();

    const diferenciaMilisegundos = fechaMilisegundos - hoyMilisegundos;

    const diferenciaDias = Math.floor(
        diferenciaMilisegundos / (1000 * 60 * 60 * 24)
    );

    return diferenciaDias;
}
