<?php

if (!function_exists("p")) {
    function p($params)
    {
        echo '<pre>';
        print_r($params);
        echo '<hr>';
        echo '</pre>';
    }
}

if (!function_exists("v")) {
    function v($params)
    {
        echo '<pre>';
        var_dump($params);
        echo '<hr>';
        echo '</pre>';
    }
}

