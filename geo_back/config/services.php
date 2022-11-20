<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'twitter' => [
        'client_id' => 'o6QhMheEbSSkMPn0uuP4Qyepw',
        'client_secret' => 'gosUlspZIu8NGLrA8LO5xY9iQpqr9AE4PJOTKULpjGDs1e9Eh1',
        'redirect' => 'http://127.0.0.1:9002/auth/callback/twitter',
    ],

    'google' => [
        'client_id' => "463074839661-k3llqnd6h8gtuhto3kudthdi8bd6pbl0.apps.googleusercontent.com",
        'client_secret' => "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",
        'redirect' => 'http://127.0.0.1:8000/api/login/google/callback',
    ],

];
