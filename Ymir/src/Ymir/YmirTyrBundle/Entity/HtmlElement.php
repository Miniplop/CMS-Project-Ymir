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
     * Index dans la page ou dans le widget parent 
     * @ORM\Column(name="index", type="integer")
     */
    private $index;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlParameter", mappedBy="html_element")
     */
    private $parameters; //attributs

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", mappedBy="parent_element", cascade={"persist"})
     * @ORM\OrderBy({"index" = "ASC"})
     */
    private $children;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", mappedBy="parent_element", cascade={"persist"})
     * @ORM\OrderBy({"index" = "ASC"})
     */
    private $widget_children;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", inversedBy="children")
     * @ORM\JoinColumn(name="parent_element_id", referencedColumnName="id")
     */
    private $parent_element;

    /**
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\MetaHtmlElement", inversedBy="instances")
     * @ORM\JoinColumn(name="meta_element_id", referencedColumnName="id")
     */
    private $meta_element;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", inversedBy="html_elements")
     * @ORM\JoinColumn(name="parent_widget_id", referencedColumnName="id")
     */
    private $parent_widget;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->meta_widgets = new \Doctrine\Common\Collections\ArrayCollection();
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

    // Merge two sorted table
    // /!\ CAREFUL /!\ : duplicated function (see widget.php)
   public function sortElements() {
        $childrenCount = count($this->children);
        $widgetCount = count($this->widget_children);
        $childrenIndex = 0;
        $widgetIndex = 0;
        $table = array();
        $i = 0;
        // Both table are not empty
        while ($childrenIndex < $childrenCount && $widgetIndex < $widgetCount){
                // choosing the minimum
            if ($this->children[$childrenIndex]->index <= $this->widget_children[$widgetIndex]->index) {
                    $table[$i] = $this->children[$childrenIndex];
                    $childrenIndex ++;
            } else {
                    $table[$i] = $this->widget_children[$widgetIndex];
                    $widgetIndex ++;
            }
            $i++;
        }
        // At least one of the table is empty
        if ($childrenIndex >= $childrenCount){
            // we have to copy the remaing part of the table HTML ELement
            $table[$i] = $this->widget_children[$widgetIndex];
            $widgetIndex ++;
        } elseif ($widgetIndex >= $widgetCount) {
            // we have to copy the remaing part of the table Children
            $table[$i] = $this->children[$childrenIndex];
            $childrenIndex ++;
        }
        return $table;
    }

    public function codeGen(){
        // Opening the HTML element
        $code = "<".$tag ;
        // Add the parameters
        foreach ($parameters->toArray() as $p) {
            // est-ce qu'il faut rajouter le type de l'attribut ?
            $code .= $p;
        }
        $code .= ">\n\t"

        $elements = sortElements();
        foreach ($elements->toArray() as $e) {
            $code .= $e->codeGen();
        }
        // Closing the HTML element
        $code .= "</".$tag.">\n";
        return $code;
    } 
}
