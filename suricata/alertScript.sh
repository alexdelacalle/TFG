#!/bin/bash

LOG_FILE="/var/log/suricata/fast.log"
DNAT_IP="172.16.0.14"

apply_iptables_rule() {
    local ip_source=$1

    if ! iptables -t nat -C PREROUTING -p tcp -s "$ip_source" -j DNAT --to-destination "$DNAT_IP" &> /dev/null; then
        echo "[INFO] Aplicando regla iptables para IP: $ip_source"
        iptables -t nat -A PREROUTING -p tcp -s "$ip_source" -j DNAT --to-destination "$DNAT_IP"
        iptables -t nat -A PREROUTING -p udp -s "$ip_source" -j DNAT --to-destination "$DNAT_IP"
        iptables -t nat -A POSTROUTING -d "$DNAT_IP" -j MASQUERADE

    else
        echo "[INFO] La regla para $ip_source ya existe, no se añade de nuevo."
    fi
}

echo "[*] Monitoreando $LOG_FILE para escaneos de puertos..."

tail -F "$LOG_FILE" | while read -r line; do
    if echo "$line" | grep -qE "Posible escaneo de puertos SYN detectado|NULL scan detectado|FIN scan detectado|XMAS scan detectado|Posible escaneo de puertos UDP"; then

        ip_source=$(echo "$line" | grep -oP '(\d{1,3}\.){3}\d{1,3}(?=:\d+ ->)')

        if [[ -n "$ip_source" ]]; then
            apply_iptables_rule "$ip_source"
        else
            echo "[WARN] No se pudo extraer IP origen de la línea: $line"
        fi
    fi
done
