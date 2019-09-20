<?php

namespace App\Http\Middleware;

use Closure;
use Response;
class CheckAuthRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        if($request->header('Accept') != 'application/json'){
            return Response::json(array('error'=>'wrong accept header'));
        }
        return $next($request);
    }
}
