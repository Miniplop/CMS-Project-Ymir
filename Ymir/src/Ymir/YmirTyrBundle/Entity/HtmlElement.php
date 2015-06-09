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
     * @ORM\Column(name="ordre", type="integer")
     */
    private $order;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlParameter", mappedBy="htmlElement", cascade={"persist", "remove"})
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
     * ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Property", mappedBy="parentElement", cascade={"persist", "remove"})
     */
    private $properties;

    /**
     * @Exclude
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\CssProperty", mappedBy="parentElement", cascade={"persist", "remove"})
     */
    private $cssProperties;

    /**
     * @Exclude
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlProperty", mappedBy="parentElement", cascade={"persist", "remove"})
     */
    private $htmlProperties;

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
     * Constructor
     */
    public function __construct()
    {
        $this->htmlParameters = new \Doctrine\Common\Collections\ArrayCollection();
        $this->htmlChildren = new \Doctrine\Common\Collections\ArrayCollection();
        $this->widgetChildren = new \Doctrine\Common\Collections\ArrayCollection();
        $this->properties = new \Doctrine\Common\Collections\ArrayCollection();
        $this->htmlProperties = new \Doctrine\Common\Collections\ArrayCollection();
        $this->cssProperties = new \Doctrine\Common\Collections\ArrayCollection();
        //$this->meta_widgets = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public static function deserializeJson($params) 
    {
        $htmlElement = new HtmlElement();
        $htmlElement->setTag($params["tag"]);
        $htmlElement->setOrder($params["order"]);
        $htmlElement->setValue($params["value"]);
        
        foreach($params["htmlParameters"] as $param)
        {
            $htmlParameter = HtmlParameter::deserializeJson($param);
            $htmlElement->addHtmlParameter($htmlParameter);
        }
        foreach($params["widgetChildren"] as $param)
        {
            $widgetChild = Widget::deserializeJson($param);
            //$widgetChild->setParentElement($htmlElement);
            $htmlElement->addWidgetChild($widgetChild);
        }
        foreach($params["htmlChildren"] as $param)
        {
            $htmlChild = HtmlElement::deserializeJson($param);
            //$htmlChild->setParentHtmlElement($htmlElement);
            $htmlElement->addHtmlChild($htmlChild);
        }
        foreach($params["properties"] as $param)
        {
            $property;
            if($param["type"] === "html") {
                $property = HtmlProperty::deserializeJson($param);
                $htmlElement->addHtmlProperty($property);
            } else {
                $property = CssProperty::deserializeJson($param);
                $htmlElement->addCssProperty($property);
            }
            //$property = Property::deserializeJson($param);
            //$htmlChild->setParentHtmlElement($htmlElement);
            $htmlElement->addProperty($property);
        }
        return $htmlElement;
    }

   public function sortElements() {
        $childrenCount = $this->htmlChildren->count();//count($this->htmlChildren);
        $widgetCount = $this->widgetChildren->count();//count($this->widgetChildren);
        $childrenIndex = 0;
        $widgetIndex = 0;
        $table = array();
        $i = 0;
        // Both table are not empty
        while ($childrenIndex < $childrenCount && $widgetIndex < $widgetCount){
                // choosing the minimum
            if ($this->htmlChildren->get($childrenIndex)->index <= $this->widgetChildren->get($widgetIndex)->index) {
                    $table[$i] = $this->htmlChildren->get($childrenIndex);
                    $childrenIndex ++;
            } else {
                    $table[$i] = $this->widgetChildren->get($widgetIndex);
                    $widgetIndex ++;
            }
            $i++;
        }

        if ($childrenIndex < $childrenCount){
            for ($p = $childrenIndex; $p < $childrenCount; $p++) {
                $table[$i] = $this->htmlChildren->get($p);
                $i ++;
            }
 
        } elseif ($widgetIndex < $widgetCount) {
            for ($p = $widgetIndex; $p < $widgetCount; $p++) {
                $table[$i] = $this->widgetChildren->get($p);
                $i ++;
            }
        }
        return $table;
    }


    /*
     *  Returns style attribut of the html element (inline css) if any property,
     *  Returns an empty string otherwise
     */
    public function codeGenCssInline()
    {   
        $has_css = false;
        $css_attr .= " style=\"";
        foreach($this->cssProperties->toArray() as $p)
        {
            $has_css = true;
            $css_attr .= $p->getName().":".$p->getValue().";";
        }
        
        if($has_css)
            $css_attr .= "\"";
        else 
            $css_attr = "";

        return $css_attr;
    }

    public function codeGen(&$offsetSmall, &$offsetMedium, &$offsetLarge){
        //create html parameters list from html properties
        $editedParams = array();
        foreach($this->htmlProperties->toArray() as $p) {
            $editedParams[$p->getName()] = $p->getValue();
        }

        // Opening the HTML element
        $code = "<".$this->tag ;
        
        // Handle the offset needed for empty containers
        $emptyContainer = false;
        $patternSmall = "/small-(\w*)/";
        $patternMedium = "/medium-(\w*)/";
        $patternLarge = "/large-(\w*)/";

        $previousOffsetSmall = $offsetSmall;
        $previousOffsetMedium = $offsetMedium;
        $previousOffsetLarge = $offsetLarge;

        // Add the parameters
        foreach ($this->htmlParameters->toArray() as $p) {
            // est-ce qu'il faut rajouter le type de l'attribut ?
            if ($p->getName() === "data-info" && $p->getValue() === "replaceable"){
                $emptyContainer = true;
            }
            else {
                //add the attribute
                $code .= " ".$p->getName()."=\"";
                if($editedParams[$p->getName()]) { //override par les properties
                    $code .= $editedParams[$p->getName()]."\"";
                } else {
                    $code .= $p->getValue()."\""; //valeur par defaut
                }

                //check if we need to add the offset in the class
                if ($p->getName() === "class") {
                    //get the offset for the next column, if any
                    if(preg_match($patternSmall, $p->getValue(), $offsetSmall)){
                        $offsetSmall = $offsetSmall[1];
                    }
                    if(preg_match($patternMedium, $p->getValue(), $offsetMedium)){
                        $offsetMedium = $offsetMedium[1];
                    }
                    if(preg_match($patternLarge, $p->getValue(), $offsetLarge)){
                        $offsetLarge = $offsetLarge[1];
                    }
                    //set the offset from the previous column, if any
                    $code .= " ".$p->getName()."=\"".$p->getValue();
                    if($previousOffsetSmall != -0){
                        $code .= " small-offset-".$previousOffsetSmall;
                    }
                    if($previousOffsetMedium != 0){
                        $code .= " medium-offset-".$previousOffsetMedium;
                    }
                    if($previousOffsetLarge != 0){
                        $code .= " large-offset-".$previousOffsetLarge;
                    }
                    $code .="\"";
                }
            } 
        }

        //add the css attributs inline, if any (ex : style="color:red;background:black;")
        $css_attr = $this->codeGenCssInline();
        $code .= $css_attr;
        $code .= ">\n\t";

        //value : avant ou après children ? 
        $code .= $this->getValue();

        //children
        $elements = $this->sortElements();
        $childOffsetSmall = 0;
        $childOffsetMedium = 0;
        $childOffsetLarge = 0;
        foreach ($elements as $e) {
            $code .= $e->codeGen($childOffsetSmall, $childOffsetMedium, $childOffsetLarge);
        }

        // Closing the HTML element
        $code .= "</".$this->tag.">\n";

        if ($emptyContainer){
            $code = "";
            //pour plus tard : somme des offset
        } else {
            $offsetSmall = 0;
            $offsetMedium = 0;
            $offsetLarge = 0;
        }

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
        $htmlParameter->setHtmlElement($this);
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
        $htmlChild->setParentHtmlElement($this);
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
        $widgetChild->setParentElement($this);
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

    /**
     * Add property
     *
     * @param \Ymir\YmirTyrBundle\Entity\Property $property
     *
     * @return HtmlElement
     */
    public function addProperty(\Ymir\YmirTyrBundle\Entity\Property $property)
    {
        $property->setParentHtmlElement($this);
        $this->properties[] = $property;

        return $this;
    }

    /**
     * Remove property
     *
     * @param \Ymir\YmirTyrBundle\Entity\Property $property
     */
    public function removeProperty(\Ymir\YmirTyrBundle\Entity\Property $property)
    {
        $this->properties->removeElement($property);
    }

    /**
     * Get properties
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getProperties()
    {
        return $this->properties;
    }

    /**
     * Add cssProperty
     *
     * @param \Ymir\YmirTyrBundle\Entity\CssProperty $cssProperty
     *
     * @return HtmlElement
     */
    public function addCssProperty(\Ymir\YmirTyrBundle\Entity\CssProperty $cssProperty)
    {
        $cssProperty->setParentElement($this);
        $this->cssProperties[] = $cssProperty;

        return $this;
    }

    /**
     * Remove cssProperty
     *
     * @param \Ymir\YmirTyrBundle\Entity\CssProperty $cssProperty
     */
    public function removeCssProperty(\Ymir\YmirTyrBundle\Entity\CssProperty $cssProperty)
    {
        $this->cssProperties->removeElement($cssProperty);
    }

    /**
     * Get cssProperties
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCssProperties()
    {
        return $this->cssProperties;
    }

    /**
     * Add htmlProperty
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlProperty $htmlProperty
     *
     * @return HtmlElement
     */
    public function addHtmlProperty(\Ymir\YmirTyrBundle\Entity\HtmlProperty $htmlProperty)
    {
        $htmlProperty->setParentElement($this);
        $this->htmlProperties[] = $htmlProperty;

        return $this;
    }

    /**
     * Remove htmlProperty
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlProperty $htmlProperty
     */
    public function removeHtmlProperty(\Ymir\YmirTyrBundle\Entity\HtmlProperty $htmlProperty)
    {
        $this->htmlProperties->removeElement($htmlProperty);
    }

    /**
     * Get htmlProperties
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getHtmlProperties()
    {
        return $this->htmlProperties;
    }
}
