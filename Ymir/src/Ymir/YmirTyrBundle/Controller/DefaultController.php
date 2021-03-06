<?php

namespace Ymir\YmirTyrBundle\Controller;

use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use FOS\UserBundle\Event\GetResponseUserEvent;
use Symfony\Component\HttpFoundation\Response;

use FOS\UserBundle\FOSUserEvents;

use FOS\UserBundle\Controller\RegistrationController as BaseController;

class DefaultController extends BaseController
{
    /**
     * @Route("/", name="index")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $securityContext = $this->container->get('security.context');
        if ($securityContext->isGranted('IS_AUTHENTICATED_REMEMBERED')) {
            return $this->redirect($this->generateUrl('profile'));
            // authenticated REMEMBERED, FULLY will imply REMEMBERED (NON anonymous)
        } else {
            /** @var $formFactory \FOS\UserBundle\Form\Factory\FactoryInterface */
            $formFactory = $this->get('fos_user.registration.form.factory');
            /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
            $userManager = $this->get('fos_user.user_manager');
            /** @var $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface */
            $dispatcher = $this->get('event_dispatcher');
            $user = $userManager->createUser();
            $user->setEnabled(true);
            $event = new GetResponseUserEvent($user, $request);
            $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);
            if (null !== $event->getResponse()) {
                return $event->getResponse();
            }
            $form = $formFactory->createForm();
            $form->setData($user);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $event = new FormEvent($form, $request);
                $dispatcher->dispatch(FOSUserEvents::REGISTRATION_SUCCESS, $event);
                $userManager->updateUser($user);
                if (null === $response = $event->getResponse()) {
                    $url = $this->generateUrl('fos_user_registration_confirmed');
                    $response = new RedirectResponse($url);
                }
                $dispatcher->dispatch(FOSUserEvents::REGISTRATION_COMPLETED, new FilterUserResponseEvent($user, $request, $response));
                return $response;
            }
            return $this->render('TyrBundle:Default:index.html.twig', array(
                'form' => $form->createView(), 'errors' => $form->getErrors(true, false),
            ));
        }
    }

    /**
     * @Route("/profile", name="profile")
     * @Template("TyrBundle:Profil:index.html.twig")
     */
    public function profileAction()
    {
        return array();
    }

    /**
     * @Route("/register/confirmed", name="register")
     * @Template("TyrBundle:Profil:confirm.html.twig")
     */
    public function regAction()
    {
        //return $this->forward("TyrBundle:Default:profile", array(), array());
        //return $this->render( $this->generateUrl('profile', array()));
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
     * @Route("/creative/{id}")
     * @Template("TyrBundle:Creative:index.html.twig")
     */
    public function displayCreativeAction($id)
    {
        //TODO : vérifier si la page existe et que le propriétaire est bien le user courant
        return array('id_page' => $id);
    }
    
    /**
     * @Route("/widgets", name="widgets")
     */
    public function widgetsAction()
    {
    	return new Response(file_get_contents($this->get('kernel')->getRootDir().'/../web/json/meta-widgets.json'), 200, array('Content-Type' => 'application/json'));
    }

    /**
     * @Route("/stage", name="stage")
     */
    public function pagesAction()
    {
        return new Response(file_get_contents($this->get('kernel')->getRootDir().'/../web/json/stage.json'), 200, array('Content-Type' => 'application/json'));
    }
    
}


