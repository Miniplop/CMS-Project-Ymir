<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;

/**
 * HtmlElement
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Ymir\YmirTyrBundle\Entity\HtmlElementRepository")
 */
class HtmlElement
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
     * @ORM\Column(name="tag", type="string", length=255)
     */
    private $tag;

    /**
     *
     * @ORM\Column(name="value", type="text")
     */
    private $value;

    /**
     * Index dans la page ou dans le widget parent 
     * @ORM\Column(name="order", type="integer")
     */
    private $order;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlParameter", mappedBy="htmlElement")
     */
    private $htmlParameters; //attributs

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", mappedBy="parentHtmlElement", cascade={"persist", "remove"})
     * @ORM\OrderBy({"order" = "ASC"})
     */
    private $htmlChildren;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", mappedBy="parentElement", cascade={"persist", "remove"})
     * @ORM\OrderBy({"order" = "ASC"})
     */
    private $widgetChildren;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", inversedBy="htmlChildren")
     * @ORM\JoinColumn(name="parent_element_id", referencedColumnName="id")
     */
    private $parentHtmlElement;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", inversedBy="htmlElements")
     * @ORM\JoinColumn(name="parent_widget_id", referencedColumnName="id")
     */
    private $parentWidget;

    /**
     * ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\MetaHtmlElement", inversedBy="instances")
     * ORM\JoinColumn(name="meta_element_id", referencedColumnName="id")
     */
    //private $meta_element;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->htmlParameters = new \Doctrine\Common\Collections\ArrayCollection();
        $this->htmlChildren = new \Doctrine\Common\Collections\ArrayCollection();
        $this->widgetChildren = new \Doctrine\Common\Collections\ArrayCollection();
        //$this->meta_widgets = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set balise
     *
     * @param string $balise
     *
     * @return HtmlElement
     */
    public function setBalise($balise)
    {
        $this->balise = $balise;

        return $this;
    }

    /**
     * Get balise
     *
     * @return string
     */
    public function getBalise()
    {
        return $this->balise;
    }

    /**
     * Add metaWidget
     *
     * @param \Ymir\YmirTyrBundle\Entity\MetaWidget $metaWidget
     *
     * @return HtmlElement
     */
    public function addMetaWidget(\Ymir\YmirTyrBundle\Entity\MetaWidget $metaWidget)
    {
        $this->meta_widgets[] = $metaWidget;

        return $this;
    }

    /**
     * Remove metaWidget
     *
     * @param \Ymir\YmirTyrBundle\Entity\MetaWidget $metaWidget
     */
    public function removeMetaWidget(\Ymir\YmirTyrBundle\Entity\MetaWidget $metaWidget)
    {
        $this->meta_widgets->removeElement($metaWidget);
    }

    /**
     * Get metaWidgets
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getMetaWidgets()
    {
        return $this->meta_widgets;
    }

    /**
     * Set tag
     *
     * @param string $tag
     *
     * @return HtmlElement
     */
    public function setTag($tag)
    {
        $this->tag = $tag;

        return $this;
    }

    /**
     * Get tag
     *
     * @return string
     */
    public function getTag()
    {
        return $this->tag;
    }

    /**
     * Set index
     *
     * @param integer $index
     *
     * @return HtmlElement
     */
    public function setIndex($index)
    {
        $this->index = $index;

        return $this;
    }

    /**
     * Get index
     *
     * @return integer
     */
    public function getIndex()
    {
        return $this->index;
    }

    /**
     * Add parameter
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlParameter $parameter
     *
     * @return HtmlElement
     */
    public function addParameter(\Ymir\YmirTyrBundle\Entity\HtmlParameter $parameter)
    {
        $this->parameters[] = $parameter;

        return $this;
    }

    /**
     * Remove parameter
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlParameter $parameter
     */
    public function removeParameter(\Ymir\YmirTyrBundle\Entity\HtmlParameter $parameter)
    {
        $this->parameters->removeElement($parameter);
    }

    /**
     * Get parameters
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getParameters()
    {
        return $this->parameters;
    }

    /**
     * Add child
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $child
     *
     * @return HtmlElement
     */
    public function addChild(\Ymir\YmirTyrBundle\Entity\HtmlElement $child)
    {
        $this->children[] = $child;

        return $this;
    }

    /**
     * Remove child
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $child
     */
    public function removeChild(\Ymir\YmirTyrBundle\Entity\HtmlElement $child)
    {
        $this->children->removeElement($child);
    }

    /**
     * Get children
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * Set parentElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $parentElement
     *
     * @return HtmlElement
     */
    public function setParentElement(\Ymir\YmirTyrBundle\Entity\HtmlElement $parentElement = null)
    {
        $this->parent_element = $parentElement;

        return $this;
    }

    /**
     * Get parentElement
     *
     * @return \Ymir\YmirTyrBundle\Entity\HtmlElement
     */
    public function getParentElement()
    {
        return $this->parent_element;
    }

    /**
     * Set metaElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\MetaHtmlElement $metaElement
     *
     * @return HtmlElement
     */
    public function setMetaElement(\Ymir\YmirTyrBundle\Entity\MetaHtmlElement $metaElement = null)
    {
        $this->meta_element = $metaElement;

        return $this;
    }

    /**
     * Get metaElement
     *
     * @return \Ymir\YmirTyrBundle\Entity\MetaHtmlElement
     */
    public function getMetaElement()
    {
        return $this->meta_element;
    }

    /**
     * Set parentWidget
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $parentWidget
     *
     * @return HtmlElement
     */
    public function setParentWidget(\Ymir\YmirTyrBundle\Entity\Widget $parentWidget = null)
    {
        $this->parent_widget = $parentWidget;

        return $this;
    }

    /**
     * Get parentWidget
     *
     * @return \Ymir\YmirTyrBundle\Entity\Widget
     */
    public function getParentWidget()
    {
        return $this->parent_widget;
    }

    /**
     * Add widgetChild
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $widgetChild
     *
     * @return HtmlElement
     */
    public function addWidgetChild(\Ymir\YmirTyrBundle\Entity\Widget $widgetChild)
    {
        $this->widget_children[] = $widgetChild;

        return $this;
    }

    /**
     * Remove widgetChild
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $widgetChild
     */
    public function removeWidgetChild(\Ymir\YmirTyrBundle\Entity\Widget $widgetChild)
    {
        $this->widget_children->removeElement($widgetChild);
    }

    /**
     * Get widgetChildren
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getWidgetChildren()
    {
        return $this->widget_children;
    }

    /**
     * Set value
     *
     * @param string $value
     *
     * @return HtmlElement
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set order
     *
     * @param integer $order
     *
     * @return HtmlElement
     */
    public function setOrder($order)
    {
        $this->order = $order;

        return $this;
    }

    /**
     * Get order
     *
     * @return integer
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * Add htmlParameter
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlParameter $htmlParameter
     *
     * @return HtmlElement
     */
    public function addHtmlParameter(\Ymir\YmirTyrBundle\Entity\HtmlParameter $htmlParameter)
    {
        $this->htmlParameters[] = $htmlParameter;

        return $this;
    }

    /**
     * Remove htmlParameter
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlParameter $htmlParameter
     */
    public function removeHtmlParameter(\Ymir\YmirTyrBundle\Entity\HtmlParameter $htmlParameter)
    {
        $this->htmlParameters->removeElement($htmlParameter);
    }

    /**
     * Get htmlParameters
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getHtmlParameters()
    {
        return $this->htmlParameters;
    }

    /**
     * Add htmlChild
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $htmlChild
     *
     * @return HtmlElement
     */
    public function addHtmlChild(\Ymir\YmirTyrBundle\Entity\HtmlElement $htmlChild)
    {
        $this->htmlChildren[] = $htmlChild;

        return $this;
    }

    /**
     * Remove htmlChild
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $htmlChild
     */
    public function removeHtmlChild(\Ymir\YmirTyrBundle\Entity\HtmlElement $htmlChild)
    {
        $this->htmlChildren->removeElement($htmlChild);
    }

    /**
     * Get htmlChildren
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getHtmlChildren()
    {
        return $this->htmlChildren;
    }

    /**
     * Set parentHtmlElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $parentHtmlElement
     *
     * @return HtmlElement
     */
    public function setParentHtmlElement(\Ymir\YmirTyrBundle\Entity\HtmlElement $parentHtmlElement = null)
    {
        $this->parentHtmlElement = $parentHtmlElement;

        return $this;
    }

    /**
     * Get parentHtmlElement
     *
     * @return \Ymir\YmirTyrBundle\Entity\HtmlElement
     */
    public function getParentHtmlElement()
    {
        return $this->parentHtmlElement;
    }
}
