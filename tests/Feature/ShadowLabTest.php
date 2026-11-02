<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ShadowLabTest extends TestCase
{
    public function test_editor_loads_in_indonesian_without_database_access(): void
    {
        DB::shouldReceive('connection')->never();

        $this->get('/')
            ->assertOk()
            ->assertSee('<html lang="id">', false)
            ->assertSee('<h1 id="page-title">Buat Bayangan CSS dengan Mudah.</h1>', false)
            ->assertSee('Pengaturan bayangan')
            ->assertSee('Opasitas bayangan')
            ->assertSee('Pratinjau')
            ->assertSee('Kode CSS')
            ->assertSee('Salin CSS')
            ->assertSee('Reset');
    }

    public function test_generator_does_not_expose_a_backend_processing_endpoint(): void
    {
        $this->post('/')->assertStatus(405);
    }
}
