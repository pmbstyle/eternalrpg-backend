<?php

namespace App\Services;

use App\Models\ServerManager;
use App\Models\ServerStatusManager;

use MinecraftServerStatus\Packets\HandshakePacket;
use MinecraftServerStatus\Packets\PingPacket;


class ServerStatus
{
    public function getServersStatus(){
        
        $servers = ServerManager::where('status','on')->get();

        foreach($servers as $server) {

            $response = ServerStatus::query($server->ip, $server->port);

            $statusRecord = new ServerStatusManager;

            $statusRecord->server_id = $server->id;
            $statusRecord->players = $response ? $response['players'] : 0;

            $statusRecord->save();

        }

    }

    public static function query ($host = '127.0.0.1', $port = 25565) {

        $host = filter_var($host, FILTER_VALIDATE_IP) ? $host : gethostbyname($host);
        
        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        if (! @socket_connect($socket, $host, $port)) {
            return false;
        }
        
        // create the handshake and ping packet
        $handshakePacket = new HandshakePacket($host, $port, 107, 1);
        $pingPacket = new PingPacket();
        
        $handshakePacket->send($socket);
        
        // high five
        $start = microtime(true);
        $pingPacket->send($socket);
        $length = self::readVarInt($socket);
        $ping = round((microtime(true) - $start) * 1000);
        
        // read the requested data
        $data = socket_read($socket, $length, PHP_NORMAL_READ);
        $data = strstr($data, '{');
        $data = json_decode($data);
        
        $descriptionRaw = isset($data->description) ? $data->description : false;
        $description = $descriptionRaw;
        
        // colorize the description if it is supported
        if (gettype($descriptionRaw) == 'object' && isset($descriptionRaw->extra)) {
            $description = '';
            foreach ($descriptionRaw->extra as $item) {
                $description .= isset($item->bold) && $item->bold ? '<b>' : '';
                $description .= isset($item->bold) && $item->bold ? '</b>' : '';
            }
        }
        
        return array(
            'hostname' => $host,
            'port' => $port,
            'ping' => $ping,
            'version' => isset($data->version->name) ? $data->version->name : false,
            'protocol' => isset($data->version->protocol) ? $data->version->protocol : false,
            'players' => isset($data->players->online) ? $data->players->online : false,
            'max_players' => isset($data->players->max) ? $data->players->max : false,
            'description' => $description,
            'description_raw' => $descriptionRaw,
            'favicon' => isset($data->favicon) ? $data->favicon : false,
            'modinfo' => isset($data->modinfo) ? $data->modinfo : false
        );
    }

    private static function readVarInt ($socket) {
        $a = 0;
        $b = 0;
        while (true) {
            $c = socket_read($socket, 1);
            if (! $c) {
                return 0;
            }
            $c = Ord($c);
            $a |= ($c & 0x7F) << $b ++ * 7;
            if ($b > 5) {
                return false;
            }
            if (($c & 0x80) != 128) {
                break;
            }
        }
        return $a;
    }
}
