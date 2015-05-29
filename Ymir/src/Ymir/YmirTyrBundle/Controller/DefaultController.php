<?php

namespace Ymir\YmirTyrBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }
    
    /**
     * @Route("/creative")
     * @Template("TyrBundle:Creative:index.html.twig")
     */
    public function creativeAction()
    {
        return array();
    }
    
    /**
     * @Route("/widgets")
     */
    public function widgetsAction()
    {
    	return new Response(file_get_contents($this->get('kernel')->getRootDir().'/../web/json/widgets.json'), 200, array('Content-Type' => 'application/json'));
    }
}
