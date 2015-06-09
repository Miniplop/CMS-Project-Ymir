<?php

namespace Ymir\YmirTyrBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContext;

class SecurityController extends Controller
{
    /**
     * @Route("/login")
     * @Template()
     */
    public function loginAction(Request $request)
    {
        // Si le visiteur est déjà identifié, on le redirige vers l'accueil
	    if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_REMEMBERED')) {
	      //return $this->redirect($this->generateUrl('oc_platform_accueil'));
	    }

	    $session = $request->getSession();

	    // On vérifie s'il y a des erreurs d'une précédente soumission du formulaire
	    if ($request->attributes->has(SecurityContext::AUTHENTICATION_ERROR)) {
	      $error = $request->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
	    } else {
	      $error = $session->get(SecurityContext::AUTHENTICATION_ERROR);
	      $session->remove(SecurityContext::AUTHENTICATION_ERROR);
	    }

	    return $this->render('TyrBundle:Security:login.html.twig', array(
	      // Valeur du précédent nom d'utilisateur entré par l'internaute
	      'last_username' => $session->get(SecurityContext::LAST_USERNAME),
	      'error'         => $error,
    	));
	}

	/**
     * @Route("/register/confirmed")
     * @Template()
     */
    public function confirmRegistrationAction(Request $request) {
    	return $this->render('TyrBundle:Profil:confirm.html.twig', array());
    }
}



