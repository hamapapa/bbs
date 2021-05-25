<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class Login
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        if (Auth::attempt($args)) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            $success['user'] = $user;
            return $success;
        }
    }
}
