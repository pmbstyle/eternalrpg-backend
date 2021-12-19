<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'pmb',
            'email' => 'slava@trofimov.ca',
            'password' => bcrypt('198513')
        ]);

        DB::table('distro_managers')->insert([
            'client_version' => '0.1.1',
            'client_folder' => 'client/latest',
            'java_version' => '17.35',
            'java_folder_win' => 'java/win',
            'java_folder_mac' => 'java/mac',
            'java_folder_lin' => 'java/lin',
            'delivery' => 'local',
            'status' => 'test',
        ]);

        DB::table('distro_managers')->insert([
            'client_version' => '0.1.1',
            'client_folder' => 'client/latest',
            'java_version' => '17.35',
            'java_folder_win' => 'java/win',
            'java_folder_mac' => 'java/mac',
            'java_folder_lin' => 'java/lin',
            'delivery' => 'web',
            'status' => 'live',
        ]);

        DB::table('maintenance_managers')->insert([
            'status' => 'off',
            'description' => 'none'
        ]);
    }
}
