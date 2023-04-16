export const esMayorDe15 = (fechaNacimiento) => {
    const msEnUnAnio = 1000 * 60 * 60 * 24 * 365.25;
    const fechaNacimientoMs = new Date(fechaNacimiento).getTime();
    const edadMs = Date.now() - fechaNacimientoMs;
    const edad = edadMs / msEnUnAnio;

    return edad >= 15;
}

export const esMayorDe18 = (fechaNacimiento) => {
    const msEnUnAnio = 1000 * 60 * 60 * 24 * 365.25;
    const fechaNacimientoMs = new Date(fechaNacimiento).getTime();
    const edadMs = Date.now() - fechaNacimientoMs;
    const edad = edadMs / msEnUnAnio;

    return edad >= 18;
}