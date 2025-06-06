#!/bin/bash

sysctl -w net.ipv4.ip_forward=1

apt-get update && apt-get install -y frr

sed -i 's/vtysh_enable=no/vtysh_enable=yes/' /etc/frr/daemons

service frr restart

vtysh << EOF
configure
ip route 10.10.1.0/24 10.10.0.134
ip route 10.10.2.0/24 10.10.0.134
ip route 172.16.0.0/24 10.10.0.134
exit
write memory
exit
EOF

tail -f /dev/null