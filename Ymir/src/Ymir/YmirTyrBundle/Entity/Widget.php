<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as JMS;

/**
 * Widget
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Ymir\YmirTyrBundle\Entity\WidgetRepository")
 */
class Widget
{
    /**
     * @var integer
     *
     * @JMS\Type("integer")
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * Index dans la page ou dans le widget parent
     * @JMS\Type("integer")
     * @ORM\Column(name="ordre", type="integer")
     */
    private $order;

    /**
     * @JMS\Type("ArrayCollection<Ymir\YmirTyrBundle\Entity\HtmlElement>")
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", mappedBy="parentWidget", cascade={"persist", "remove"}, orphanRemoval=true)
     * @ORM\OrderBy({"order" = "ASC"})
     */
    private $htmlElements;

    /**
     * @JMS\Type("ArrayCollection<Ymir\YmirTyrBundle\Entity\Widget>")
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", mappedBy="parentWidget", cascade={"persist", "remove"}, orphanRemoval=true)
     * @ORM\OrderBy({"order" = "ASC"})
     */
    private $widgetChildren;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Page", inversedBy="widgets")
     * @ORM\JoinColumn(name="page_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $parentPage;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", inversedBy="widgetChildren")
     * @ORM\JoinColumn(name="parent_element_id", referencedColumnName="id", nullable=true, onDelete="CASCADE")
     */
    private $parentElement;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", inversedBy="widgetChildren")
     * @ORM\JoinColumn(name="parent_widget_id", referencedColumnName="id", nullable=true, onDelete="CASCADE")
     */
    private $parentWidget;


    public function __construct()
    {
        $this->htmlElements = new ArrayCollection();
        $this->widgetChildren = new ArrayCollection();
    }

    public static function deserializeJson($params) 
    {
        $widget = new Widget();
        $widget->setOrder($params["order"]);
        foreach($params["htmlElements"] as $param)
        {
            $htmlElement = HtmlElement::deserializeJson($param);
            //$htmlElement->setParentWidget($widget);
            $widget->addHtmlElement($htmlElement);
        }
        return $widget;
    }

    /**
     * ORM\PreFlush
     */
    /*public function setCreatedValue()
    {
        $em = $this->get('doctrine')->getManager();
        foreach($this->htmlElements as $htmlElement) {
            $em->persist($htmlElement);
        }
    }*/

    // Merge two sorted table
    public function sortElements() {
        $childrenCount = count($this->widgetChildren);
        $html_elCount = count($this->htmlElements);
        $childrenIndex = 0;
        $html_elIndex = 0;
        $table = array();
        $i = 0;
        // Both table are not empty
        while ($childrenIndex < $childrenCount && $html_elIndex < $html_elCount){
                // choosing the minimum
            if ($this->widgetChildren[$childrenIndex]->index <= $this->htmlElements[$html_elIndex]->index) {
                    $table[$i] = $this->widgetChildren[$childrenIndex];
                    $childrenIndex ++;
            } else {
                    $table[$i] = $this->htmlElements[$html_elIndex];
                    $html_elIndex ++;
            }
            $i++;
        }
        // At least one of the table is empty
        /*if ($childrenIndex >= $childrenCount){
            // we have to copy the remaing part of the table HTML ELement
            $table[$i] = $this->htmlElements[$html_elIndex];
            $html_elIndex ++;
        } elseif ($html_elIndex >= $html_elCount) {
            // we have to copy the remaing part of the table Children
            $table[$i] = $this->widgetChildren[$childrenIndex];
            $childrenIndex ++;
        }*/
        if ($html_elIndex < $html_elCount){
            for ($p = $html_elIndex; $p < $html_elCount; $p++) {
                $table[$i] = $this->htmlElements->get($p);
                $i ++;
            }
 
        } elseif ($childrenIndex < $childrenCount) {
            for ($p = $childrenIndex; $p < $childrenCount; $p++) {
                $table[$i] = $this->widgetChildren->get($p);
                $i ++;
            }
        }
        return $table;
    }


    /**
     * Generate Code Widget
     * 
    */
    public function  codeGen($offsetSmall, $offsetMedium, $offsetLarge)
    {
        $elements = $this->sortElements();
        $code = "";

        /*$offsetSmall = 0;
        $offsetMedium = 0;
        $offsetLarge = 0;*/
        
        foreach ($elements as $e) {
            $code .= $e->codeGen($offsetSmall, $offsetMedium, $offsetLarge);
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
     * Set order
     *
     * @param integer $order
     *
     * @return Widget
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
     * Add htmlElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement
     *
     * @return Widget
     */
    public function addHtmlElement(\Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement)
    {
        $htmlElement->setParentWidget($this);
        $this->htmlElements[] = $htmlElement;

        return $this;
    }

    /**
     * Remove htmlElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement
     */
    public function removeHtmlElement(\Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement)
    {
        $this->htmlElements->removeElement($htmlElement);
    }

    /**
     * Get htmlElements
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getHtmlElements()
    {
        return $this->htmlElements;
    }

    /**
     * Add widgetChild
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $widgetChild
     *
     * @return Widget
     */
    public function addWidgetChild(\Ymir\YmirTyrBundle\Entity\Widget $widgetChild)
    {
        $widgetChild->setParentWidget($this);
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
     * Set parentPage
     *
     * @param \Ymir\YmirTyrBundle\Entity\Page $parentPage
     *
     * @return Widget
     */
    public function setParentPage(\Ymir\YmirTyrBundle\Entity\Page $parentPage = null)
    {
        $this->parentPage = $parentPage;

        return $this;
    }

    /**
     * Get parentPage
     *
     * @return \Ymir\YmirTyrBundle\Entity\Page
     */
    public function getParentPage()
    {
        return $this->parentPage;
    }

    /**
     * Set parentElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $parentElement
     *
     * @return Widget
     */
    public function setParentElement(\Ymir\YmirTyrBundle\Entity\HtmlElement $parentElement = null)
    {
        $this->parentElement = $parentElement;

        return $this;
    }

    /**
     * Get parentElement
     *
     * @return \Ymir\YmirTyrBundle\Entity\HtmlElement
     */
    public function getParentElement()
    {
        return $this->parentElement;
    }

    /**
     * Set parentWidget
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $parentWidget
     *
     * @return Widget
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
