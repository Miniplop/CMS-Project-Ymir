<?php

namespace Ymir\YmirTyrBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ExportControllerTest extends WebTestCase
{
    public function testExportpage()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/exportPage');
    }

    public function testExportproject()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/exportProject');
    }

}
