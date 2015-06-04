<?php

namespace Ymir\YmirTyrBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\HttpFoundation\Request;
use Ymir\YmirTyrBundle\Form\PageType;
use Ymir\YmirTyrBundle\Entity\Page;


class PageController extends Controller
{
	/**
     * @return array
     * @View()
     */
    public function postPagesAction(Request $request)
    {
        //$project_id = $request->attributes->get('project_id');
        //$request->attributes->remove('project_id');

        $form = $this->createForm(new PageType(), new Page());
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $page = $form->getData();
            
            $em = $this->get('doctrine')->getManager();
            $em->persist($page);
            $em->flush();

            return array('page' => $page);
        }
        return array('error' => (string) $form->getErrors(true, false));
    }

    /**
     * @param Page $page
     * @return array
     * @View()
     * @ParamConverter("page", class="TyrBundle:Page")
     */
    public function getPageAction(Page $page)
    {
        return array('page' => $page);
    }

    /**
     * @param Page $page
     * @return array
     * @View()
     * @ParamConverter("page", class="TyrBundle:Page")
     */
    public function putPageAction(Page $page, Request $request)
    {
        
        $form = $this->createForm(new PageType(), $page);
        return array('test' => $page);
        /*$form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->flush();

            return array('page' => $page);
        }
        return array('error' => (string) $form->getErrors(true, false));*/
    }

    /**
     * @param Page $page
     * @return array
     * @View()
     * @ParamConverter("page", class="TyrBundle:Page")
     */
    public function deletePageAction(Page $page)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($page);
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
