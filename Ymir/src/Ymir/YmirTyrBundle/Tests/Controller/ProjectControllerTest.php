<?php

namespace Ymir\YmirTyrBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ProjectControllerTest extends WebTestCase
{
    public function testCreate()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/create');
    }

    public function testList()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/list');
    }

}
