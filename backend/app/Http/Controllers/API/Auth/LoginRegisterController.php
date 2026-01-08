<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class LoginRegisterController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:250',
            'email' => 'required|string|email:rfc,dns|max:250|unique:users,email',
            'mobile_no' => 'required|numeric',
            'password' => 'required|string|min:6|confirmed'
        ]);

        // If validation fails, return a JSON response with the first error message
        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->messages()->first()]);
        }

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'mobile_no' => $request->mobile_no,
            'password' => Hash::make($request->password)
        ]);

        // Generate a token for the user
        $data['token'] = $user->createToken($request->email)->accessToken;
        $data['user'] = $user;

        // Return a success JSON response
        $response = [
            'status' => true,
            'message' => 'User is created successfully.',
            'data' => $data,
        ];

        return response()->json($response, 201);
    }

    /**
     * Authenticate the user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        // Validate the incoming request data
        $validate = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        // If validation fails, return a JSON response with validation errors
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        // Check if the user with the provided email exists
        $user = User::where('email', $request->email)->first();

        // Check if the provided password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Generate a token for the user
        $data['token'] = $user->createToken($request->email)->accessToken;
        $data['user'] = $user;

        // Return a success JSON response
        $response = [
            'status' => true,
            'message' => 'User is logged in successfully.',
            'data' => $data,
        ];

        return response()->json($response, 200);
    }

    /**
     * Log out the user from application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        // Revoke all tokens associated with the authenticated user
        $request->user('api')->tokens()->delete();

        // Return a success JSON response
        return response()->json([
            'status' => true,
            'message' => 'User is logged out successfully'
        ], 200);
    }
}
