<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Widget
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Ymir\YmirTyrBundle\Entity\WidgetRepository")
 */
class Widget
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
     * Index dans la page ou dans le widget parent 
     * @ORM\Column(name="order", type="integer")
     */
    private $order;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", mappedBy="parentWidget", cascade={"persist"})
     * @ORM\OrderBy({"order" = "ASC"})
     */
    private $htmlElements;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", mappedBy="parentWidget", cascade={"persist"})
     * @ORM\OrderBy({"order" = "ASC"})
     */
    private $widgetChildren;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Page", inversedBy="widgets")
     * @ORM\JoinColumn(name="page_id", referencedColumnName="id")
     */
    private $parentPage;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", inversedBy="widgetChildren")
     * @ORM\JoinColumn(name="parent_element_id", referencedColumnName="id")
     */
    private $parentElement;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", inversedBy="widgetChildren")
     * @ORM\JoinColumn(name="parent_widget_id", referencedColumnName="id")
     */
    private $parentWidget;

    /**
     * Exclude
     * ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\MetaWidget", inversedBy="widgets")
     * ORM\JoinColumn(name="meta_widget_id", referencedColumnName="id")
     */
    //private $meta_widget;

    public function __construct()
    {
        $this->htmlElements = new ArrayCollection();
        $this->widgetChildren = new ArrayCollection();
    }

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
        if ($childrenIndex >= $childrenCount){
            // we have to copy the remaing part of the table HTML ELement
            $table[$i] = $this->htmlElements[$html_elIndex];
            $html_elIndex ++;
        } elseif ($html_elIndex >= $html_elCount) {
            // we have to copy the remaing part of the table Children
            $table[$i] = $this->widgetChildren[$childrenIndex];
            $childrenIndex ++;
        }
        return $table;
    }


    /**
     * Generate Code Widget
     * 
    */
    public function  codeGen()
    {
        $elements = sortElements();
        $code = "";
        foreach ($elements->toArray() as $e) {
            $code .= $e->codeGen();
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
