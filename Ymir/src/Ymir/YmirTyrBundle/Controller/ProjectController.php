<?php

namespace Ymir\YmirTyrBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
/**
 * @Route("/project")
 *
 */
class ProjectController extends Controller
{
    /**
     * @Route("/create")
     * @Method({"POST"})
     */
    public function createAction()
    {
        $form = $this->createForm(new ProjectType(), new Project());
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $project = $form->getData();

            $om = $this->get('doctrine')->getManager();
            $om->persist($project);
            $om->flush();

            return new JsonResponse($project->toArray(), 200);
        }
        return new JsonResponse($this->getFormErrorMessage($form), 400);
    }

    /**
     * @Route("/list")
     * @Method({"GET"})
     */
    public function listAction()
    {
        $user = $this->getUser();
        $repository = $this
          ->getDoctrine()
          ->getManager()
          ->getRepository('TyrBundle:Project');

        $listProjects = $repository->findByUser($user);
              /*array('user' => $user), // Critere
              //array('date' => 'desc'),        // Tri
              5,                              // Limite
              0                               // Offset
            );*/
        return new JsonResponse($listProjects, 200);
    }

    /**
     * @Route("/update")
     * @Method({"PUT"})
     * @Template()
     */
    public function updateAction()
    {
        return array(
                // ...
            );    
    }

    /**
     * @Route("/delete")
     * @Method({"DELETE"})
     * @Template()
     */
    public function deleteAction()
    {
        return array(
                // ...
            );    
    }

    /**
     * Util function to get the form error message
     */
    private function getFormErrorMessage(Form $form)
    {
        return array(
            'error' => (string) $form->getErrors(true, false)
        );
    }

}
