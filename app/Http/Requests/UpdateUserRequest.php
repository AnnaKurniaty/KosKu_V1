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
            'nama_lengkap' => 'string|max:255',
            'alamat_pemilik' => 'string|max:255',
            'nomor_telepon' => 'string|max:14',
        ];
    }
}
