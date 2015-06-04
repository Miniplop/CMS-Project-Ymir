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

   public function sortElements() {
        $childrenCount = count($this->htmlChildren);
        $widgetCount = count($this->widgetChildren);
        $childrenIndex = 0;
        $widgetIndex = 0;
        $table = array();
        $i = 0;
        // Both table are not empty
        while ($childrenIndex < $childrenCount && $widgetIndex < $widgetCount){
                // choosing the minimum
            if ($this->htmlChildren[$childrenIndex]->index <= $this->widgetChildren[$widgetIndex]->index) {
                    $table[$i] = $this->htmlChildren[$childrenIndex];
                    $childrenIndex ++;
            } else {
                    $table[$i] = $this->widgetChildren[$widgetIndex];
                    $widgetIndex ++;
            }
            $i++;
        }
        // At least one of the table is empty
        if ($childrenIndex >= $childrenCount){
            // we have to copy the remaing part of the table HTML ELement
            $table[$i] = $this->widgetChildren[$widgetIndex];
            $widgetIndex ++;
        } elseif ($widgetIndex >= $widgetCount) {
            // we have to copy the remaing part of the table Children
            $table[$i] = $this->htmlChildren[$childrenIndex];
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
        $code .= ">\n\t";

        $elements = sortElements();
        foreach ($elements->toArray() as $e) {
            $code .= $e->codeGen();
        }
        // Closing the HTML element
        $code .= "</".$tag.">\n";
        return $code;
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
     * Add widgetChild
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $widgetChild
     *
     * @return HtmlElement
     */
    public function addWidgetChild(\Ymir\YmirTyrBundle\Entity\Widget $widgetChild)
    {
        $this->widgetChildren[] = $widgetChild;

        return $this;
    }

    /**
     * Remove widgetChild
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $widgetChild
     */
    public function removeWidgetChild(\Ymir\YmirTyrBundle\Entity\Widget $widgetChild)
    {
        $this->widgetChildren->removeElement($widgetChild);
    }

    /**
     * Get widgetChildren
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getWidgetChildren()
    {
        return $this->widgetChildren;
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

    /**
     * Set parentWidget
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $parentWidget
     *
     * @return HtmlElement
     */
    public function setParentWidget(\Ymir\YmirTyrBundle\Entity\Widget $parentWidget = null)
    {
        $this->parentWidget = $parentWidget;

        return $this;
    }

    /**
     * Get parentWidget
     *
     * @return \Ymir\YmirTyrBundle\Entity\Widget
     */
    public function getParentWidget()
    {
        return $this->parentWidget;
    }
}
