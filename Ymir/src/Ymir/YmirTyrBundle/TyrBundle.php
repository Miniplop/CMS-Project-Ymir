<?php

namespace Ymir\YmirTyrBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class TyrBundle extends Bundle
{
	public function getParent()
    {
        return 'FOSUserBundle';
    }
}
