<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    
    public function rules(): array
    {
        return [
            'nama_lengkap' => 'required|string|max:255',
            'alamat_pemilik' => 'required|string',
            'nomor_telepon' => 'required|string|max:15|unique:users',
            'password' => [
                'required',
                Password::min(8)
                ->letters()
            ]
        ];
    }
}
