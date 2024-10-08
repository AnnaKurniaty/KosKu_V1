<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'nama_lengkap' => $this->nama_lengkap,
            'alamat_pemilik' => $this->alamat_pemilik,
            'nomor_telepon' => $this->nomor_telepon,
        ];
    }
}
