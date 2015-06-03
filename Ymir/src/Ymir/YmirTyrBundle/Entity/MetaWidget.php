<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;

/**
 * MetaWidget
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Ymir\YmirTyrBundle\Entity\MetaWidgetRepository")
 */
class MetaWidget
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", mappedBy="meta_widget")
     */
    private $widgets;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\MetaHtmlElement", mappedBy="meta_widget")
     */
    private $meta_html_elements;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->widgets = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return MetaWidget
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Add widget
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $widget
     *
     * @return MetaWidget
     */
    public function addWidget(\Ymir\YmirTyrBundle\Entity\Widget $widget)
    {
        $this->widgets[] = $widget;

        return $this;
    }

    /**
     * Remove widget
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $widget
     */
    public function removeWidget(\Ymir\YmirTyrBundle\Entity\Widget $widget)
    {
        $this->widgets->removeElement($widget);
    }

    /**
     * Get widgets
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getWidgets()
    {
        return $this->widgets;
    }

    /**
     * Set htmlElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement
     *
     * @return MetaWidget
     */
    public function setHtmlElement(\Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement = null)
    {
        $this->html_element = $htmlElement;

        return $this;
    }

    /**
     * Get htmlElement
     *
     * @return \Ymir\YmirTyrBundle\Entity\HtmlElement
     */
    public function getHtmlElement()
    {
        return $this->html_element;
    }

    /**
     * Add metaHtmlElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\MetaHtmlElement $metaHtmlElement
     *
     * @return MetaWidget
     */
    public function addMetaHtmlElement(\Ymir\YmirTyrBundle\Entity\MetaHtmlElement $metaHtmlElement)
    {
        $this->meta_html_elements[] = $metaHtmlElement;

        return $this;
    }

    /**
     * Remove metaHtmlElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\MetaHtmlElement $metaHtmlElement
     */
    public function removeMetaHtmlElement(\Ymir\YmirTyrBundle\Entity\MetaHtmlElement $metaHtmlElement)
    {
        $this->meta_html_elements->removeElement($metaHtmlElement);
    }

    /**
     * Get metaHtmlElements
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getMetaHtmlElements()
    {
        return $this->meta_html_elements;
    }
}
