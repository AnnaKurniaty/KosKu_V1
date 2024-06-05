<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as IluminateController;

class Controller extends IluminateController
{
    use AuthorizesRequests, ValidatesRequests;
}