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
use JMS\Serializer\SerializerBuilder as SerializerBuilder;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;


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
        return $page;
    }

    /**
     * @param Page $page
     * @return array
     * @View()
     * @ParamConverter("page", class="TyrBundle:Page")
     */
    public function putPageAction(Page $page, Request $request)
    {
        //suppression des elements de la page 
        $widgets = $this->getDoctrine()
            ->getRepository('TyrBundle:Widget')
            ->findByParentPage($page->getId());

        $em = $this->get('doctrine')->getManager();
        foreach($widgets as $widget) {
            $em->remove($widget);
        } 

        //instanciation des nouveaux elements
        $content = $request->getContent();
        $params = json_decode($content, true);
        $page = Page::deserializeJson($page, $params);

        //sauvegarde en BD
        $em->flush();

        return $page;
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
