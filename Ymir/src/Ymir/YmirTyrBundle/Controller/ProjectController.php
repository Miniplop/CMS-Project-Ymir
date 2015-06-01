<?php

namespace Ymir\YmirTyrBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations\View;
use Ymir\YmirTyrBundle\Form\ProjectType;
use Ymir\YmirTyrBundle\Entity\Project;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;


class ProjectController extends Controller
{   
    /**
     * @return array
     * @View()
     */
    public function postProjectsAction(Request $request)
    {
        //pour tester on prend un user en dur
        /*$id = 1;
        $repository = $this
          ->getDoctrine()
          ->getManager()
          ->getRepository('TyrBundle:User');

        $user = $repository->findOneById($id);*/
        $user = $this->getUser();
        
        $request->attributes->set('user', $user->getId());
        $form = $this->createForm(new ProjectType(), new Project());
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $project = $form->getData();
            $project->setUser($user);

            $om = $this->get('doctrine')->getManager();
            $om->persist($project);
            $om->flush();

            return array('project' => $project);
        }
        return array('error' => (string) $form->getErrors(true, false));
        //return array('error' => $this->getFormErrorMessage($form));
    }

    /**
     * @return array
     * @View()
     */
    public function getProjectsAction()
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
        //return new JsonResponse($user, 200);
        //return new JsonResponse($listProjects, 200);
        return array('projects' => $listProjects);
    }

    /**
     * @param Project $project
     * @return array
     * @View()
     * @ParamConverter("project", class="TyrBundle:Project")
     */
    public function getProjectAction(Project $project)
    {
        return array('project' => $project);
    }

    /**
     * @param Project $project
     * @return array
     * @View()
     * @ParamConverter("project", class="TyrBundle:Project")
     */
    public function putProjectAction(Project $project)
    {
        return array(
                // ...
            );    
    }

    /**
     * @param Project $project
     * @return array
     * @View()
     * @ParamConverter("project", class="TyrBundle:Project")
     */
    public function deleteProjectAction(Project $project)
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
