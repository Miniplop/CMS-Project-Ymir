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
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlParameter", mappedBy="htmlElement", cascade={"persist", "remove"}, orphanRemoval=true)
     */
    private $htmlParameters; //attributs

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", mappedBy="parentHtmlElement", cascade={"persist", "remove"}, orphanRemoval=true)
     * @ORM\OrderBy({"order" = "ASC"})
     */
    private $htmlChildren;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", mappedBy="parentElement", cascade={"persist", "remove"}, orphanRemoval=true)
     * @ORM\OrderBy({"order" = "ASC"})
     */
    private $widgetChildren;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Property", mappedBy="parentHtmlElement", cascade={"persist", "remove"}, orphanRemoval=true)
     */
    private $properties;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", inversedBy="htmlChildren")
     * @ORM\JoinColumn(name="parent_element_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $parentHtmlElement;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", inversedBy="htmlElements")
     * @ORM\JoinColumn(name="parent_widget_id", referencedColumnName="id", onDelete="CASCADE")
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
            $property = Property::deserializeJson($param);
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
            if ($this->htmlChildren->get($childrenIndex)->getOrder()<= $this->widgetChildren->get($widgetIndex)->getOrder()) {
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
        $css_attr = " style=\"";
        foreach($this->getCssProperties() as $p)
        {
            $has_css = true;
            $css_attr .= $p->getIdentifier().":".$p->getValue().";";
        }
        
        if($has_css)
            $css_attr .= "\"";
        else 
            $css_attr = "";

        return $css_attr;
    }

    public function codeGen(&$offsetSmall, &$offsetMedium, &$offsetLarge){
        //create html parameters list from html properties
        $code ="";
        $editedParams = array();
        foreach($this->getHtmlProperties() as $p) {
            //$code .= " YAAAA ". $p->getIdentifier() ." AAAAY ";
            $editedParams[$p->getIdentifier()] = $p->getValue();
        }

        // Opening the HTML element
        $code .= "<".$this->tag ;
        
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
            if (($p->getName() === "data-info" && $p->getValue() === "replaceable") || !$p->getMapped()){
                $emptyContainer = true;
            }
            else {
                //check if we need to add the offset in the class
                if ($p->getName() === "class") {
                    //get the offset for the next column, if any
                    if(preg_match($patternSmall, $p->getValue(), $offsetSmallStr)){
                        $offsetSmall += intval($offsetSmallStr[1]);
                    }
                    if(preg_match($patternMedium, $p->getValue(), $offsetMediumStr)){
                        $offsetMedium += intval($offsetMediumStr[1]);
                    }
                    if(preg_match($patternLarge, $p->getValue(), $offsetLargeStr)){
                        $offsetLarge += intval($offsetLargeStr[1]);
                    }
                    //set the offset from the previous column, if any
                    $code .= " ".$p->getName()."=\"".$p->getValue();
                    if($previousOffsetSmall != 0){
                        $code .= " small-offset-".$previousOffsetSmall;
                    }
                    if($previousOffsetMedium != 0){
                        $code .= " medium-offset-".$previousOffsetMedium;
                    }
                    if($previousOffsetLarge != 0){
                        $code .= " large-offset-".$previousOffsetLarge;
                    }
                    $code .="\"";
                } else {
                    //add the attribute
                    $code .= " ".$p->getName()."=\"";
                    if(array_key_exists($p->getName(), $editedParams)) { //override par les properties
                        $code .= $editedParams[$p->getName()]."\"";
                        unset($editedParams[$p->getName()]);
                    } else {
                        $code .= $p->getValue()."\""; //valeur par defaut
                    }
                }
            } 
        }

        //ajout des attributs restants
        foreach ($editedParams as $key => $value) {
            //$code .="YAAAAAAAAA";
            $code .= " ".$key."=\"".$value."\"";
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
            //$code .="yolooooooo".$childOffsetSmall." ".$offsetMedium." ".$offsetLarge;
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
        //$property->setParentHtmlElement($this);
        $this->properties[] = $property;
        $property->setParentHtmlElement($this);
        //$accountType->setBroker($this);

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
     */
    public function getProperties()
    {
        return $this->properties;
    }

    /**
     * Get cssProperties
     */
    public function getCssProperties()
    {
        $cssProperties = array();
        foreach($this->properties as $property) {
            if($property->getType() === "css"){
                $cssProperties[] = $property;
            }
        }
        return $cssProperties;
    }

    /**
     * Get htmlProperties
     */
    public function getHtmlProperties()
    {
        $cssProperties = array();
        foreach($this->properties as $property) {
            if($property->getType() === "html"){
                $cssProperties[] = $property;
            }
        }
        return $cssProperties;
    }
}
