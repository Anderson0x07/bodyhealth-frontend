export const acortar = (cadena, longitudMaxima) => {

    if (cadena != null) {
        if (cadena.length <= longitudMaxima) {
            return cadena; // La cadena no necesita acortarse
        } else {
            const cadenaAcortada = cadena.substring(0, longitudMaxima - 3) + "...";
            return cadenaAcortada;
        }
    }
}