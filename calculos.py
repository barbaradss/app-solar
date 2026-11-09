intervalo_s = 3600

amostras = [
    {"v": 15.0, "i": 0.2},  # 6h
    {"v": 17.0, "i": 0.8},  # 7h
    {"v": 18.5, "i": 1.5},  # 8h
    {"v": 19.0, "i": 2.1},  # 9h
    {"v": 19.5, "i": 2.6},  # 10h
    {"v": 20.0, "i": 2.8},  # 11h
    {"v": 20.0, "i": 2.9},  # 12h
    {"v": 20.0, "i": 2.8},  # 13h
    {"v": 19.5, "i": 2.4},  # 14h
    {"v": 19.0, "i": 1.9},  # 15h
    {"v": 18.5, "i": 1.2},  # 16h
    {"v": 17.0, "i": 0.6},  # 17h
    {"v": 15.0, "i": 0.1},  # 18h
]

def calcular_resumo(amostras, intervalo_s):
    """
    Calcula a energia total acumulada somando a potência
    de cada amostra multiplicada pelo intervalo de tempo em segundos.
    """
    energia_total = 0.0
    pico = 0.0
    tensao_max = 0.0

    for amostra in amostras:
        potencia = amostra["v"] * amostra["i"]  # P = V * I
        energia_total += (potencia * intervalo_s) / 3600 # Energia = Potência * Tempo

        #Calcular pico
        if potencia > pico:
            pico = potencia

        #Calcular tensão máxima
        if amostra["v"] > tensao_max:
            tensao_max = amostra["v"]

    return {"energia_total": energia_total, "pico": pico, "tensao_max": tensao_max}


print(calcular_resumo(amostras, intervalo_s))