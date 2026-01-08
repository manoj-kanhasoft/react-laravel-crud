<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Stripe\Stripe;
use Stripe\Token;
use Stripe\Charge;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    /**
     * Authenticate the user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createPaymentIntent(Request $request)
    {
        // Validate the incoming request data
        $validate = Validator::make($request->all(), [
            'amount' => 'required',
        ]);

        // If validation fails, return a JSON response with validation errors
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        // Set the Stripe API key
        $stripe = Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            // Create a PaymentIntent for the specified amount
            $stripeData = PaymentIntent::create([
                'amount' => $request->amount * 100,
                'currency' => 'usd',
                'automatic_payment_methods' => ['enabled' => true],
            ]);

            // If the PaymentIntent is created successfully, return a success JSON response
            if ($stripeData) {

                return response()->json(['status' => true, 'message' => 'PaymentIntent succesfully completed', 'data' => $stripeData]);
            } else {
                // If something goes wrong during PaymentIntent creation, return an error JSON response
                return response()->json(['status' => false, 'message' => 'Something went wrong!']);
            }
        } catch (\Stripe\Exception\CardException $e) {
            // If there's a CardException, return an error JSON response with the error message
            return response()->json(['status' => false, 'message' => $e->getError()->message]);
        }
    }

    public function storePaymentSuccess(Request $request)
    {
        // Validate the incoming request data
        $validate = Validator::make($request->all(), [
            'user_id' => 'required',
            'status' => 'required',
            'stripe_payment_id' => 'required',
            'amount' => 'required',
        ]);

        // If validation fails, return a JSON response with validation errors
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        try {
            // Store payment success information in the database
            $data = Payment::create([
                'user_id' => $request->user_id,
                'amount' => $request->amount,
                'stripe_payment_id' => $request->stripe_payment_id,
                'status' => $request->status,
            ]);
            return response()->json(['status' => true, 'message' => 'data succesfully store', 'data' => $data]);
        } catch (\Stripe\Exception\CardException $e) {
            // If there's a CardException, return an error JSON response with the error message
            return response()->json(['status' => false, 'message' => $e->getError()->message]);
        }
    }
}
