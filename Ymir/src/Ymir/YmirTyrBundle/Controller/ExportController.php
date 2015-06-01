<?php

namespace Ymir\YmirTyrBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * @Route("/export")
 */
class ExportController extends Controller
{
    /**
     * @Route("/{id_project}/{id_page}", requirements={"id_project" = "\d+", "id_page" = "\d+"})
     * @Template()
     */
    public function exportPageAction($id_project, $id_page)
    {
        //récupération de la page en BD
        /*$repository = $this
          ->getDoctrine()
          ->getManager()
          ->getRepository('TyrBundle:Page');

        $page = $repository->findOneBy(array('id_project' => $id_project, 'id' => $id_page));
        */

        //génération du code de la page

        //retourner le fichier généré
        return array(
                // ...
            );    
    }

    /**
     * @Route("/{id_project}", requirements={"id_project" = "\d+"})
     * @Template()
     */
    public function exportProjectAction($id_project)
    {
        return array(
                // ...
            );    
    }

}
