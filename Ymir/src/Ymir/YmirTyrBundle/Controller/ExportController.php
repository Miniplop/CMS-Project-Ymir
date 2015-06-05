<?php

namespace Ymir\YmirTyrBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Route("/export")
 */
class ExportController extends Controller
{
    /**
     * @Route("/page/{id_page}", requirements={"id_page" = "\d+"})
     * @Template()
     */
    public function exportPageAction($id_page)
    {
        //récupération de la page en BD
        $repository = $this
          ->getDoctrine()
          ->getManager()
          ->getRepository('TyrBundle:Page');

        $page = $repository->findOneById($id_page);
        $pageName = $page->getTitle();

        //génération du code de la page
        $code = $page->codeGen();
        
        //return generated file
        $response = new Response();
        $response->setContent($code);
        $response->headers->set('Content-Type', 'text/plain');
        $response->headers->set('Content-disposition', 'attachment; filename="'.$pageName.'.html"');
        return $response;  
    }

    /**
     * @Route("/project/{id_project}", requirements={"id_project" = "\d+"})
     * @Template()
     */
    public function exportProjectAction($id_project)
    {
        return array(
                // ...
            );    
    }

}
