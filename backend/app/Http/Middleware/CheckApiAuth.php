<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckApiAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard('api')->check()) {
            // User is authenticated, proceed with the request.
            return $next($request);
        }
        return response()->json([
            'status' => 'Failed',
            'message' => 'please authenticate..'
        ], 401);
        // User is not authenticated. You can customize the response or redirect as needed.
        // return response()->json(['error' => 'Unauthorized'], 401);
    }
}
