<?php

namespace Ymir\YmirTyrBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
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
        $user = $this->getUser();
        
        $request->attributes->set('user', $user->getId());
        $form = $this->createForm(new ProjectType(), new Project());
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $project = $form->getData();
            $project->setUser($user);

            $em = $this->get('doctrine')->getManager();
            $em->persist($project);
            foreach($project->getPages()->toArray() as $page) {
                $page->setProject($project);
                $em->persist($page);
            }
            $em->flush();

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
        $form = $this->createForm(new ProjectType(), $project);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($project);
            $em->flush();

            return array('project' => $project);
        }
        return array('error' => (string) $form->getErrors(true, false));
    }

    /**
     * @param Project $project
     * @return array
     * @View()
     * @ParamConverter("project", class="TyrBundle:Project")
     */
    public function deleteProjectAction(Project $project)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($project);
        $em->flush();

        //return $this->view(null, Codes::HTTP_NO_CONTENT);
        return array();
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
