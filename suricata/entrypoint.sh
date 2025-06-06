#!/bin/bash

ip route del default via 10.10.0.2 2>/dev/null
ip route add default via 10.10.0.1
ip route add 10.10.2.0/24 via 10.10.1.1
ip route add 172.16.0.0/24 via 10.10.1.1
iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE
iptables -A FORWARD -i eth0 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i eth1 -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT
iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT

suricata -c /etc/suricata/suricata.yaml -i eth0 -D

python3 /root/xss_training.py
wait
python3 /root/monitor_suricata_alerts.py

