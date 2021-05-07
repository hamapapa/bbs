<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $random = Str::random(10);
        // DB::table('users')->insert([
        // User::create([
        //     'name' => "ユーザ " . $random,
        //     'email' => $random. '@example.com',
        //     'password' => Hash::make('password')
        // ]);
        
        
        // use factory
        User::factory(10)->create();
    }
}
