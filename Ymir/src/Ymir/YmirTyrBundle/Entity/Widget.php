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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Page", inversedBy="widgets")
     * @ORM\JoinColumn(name="page_id", referencedColumnName="id")
     */
    private $parent_page;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", inversedBy="children")
     * @ORM\JoinColumn(name="parent_widget_id", referencedColumnName="id")
     */
    private $parent_widget;

    /**
     * Index dans la page ou dans le widget parent 
     * @ORM\Column(name="index", type="integer")
     */
    

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Widget", mappedBy="parent_widget", cascade={"persist"})
     * @ORM\OrderBy({"index" = "ASC"})
     */
    private $children;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\MetaWidget", inversedBy="widgets")
     * @ORM\JoinColumn(name="meta_widget_id", referencedColumnName="id")
     */
    private $meta_widget;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", inversedBy="widget_children")
     * @ORM\JoinColumn(name="parent_element_id", referencedColumnName="id")
     */
    private $parent_element;


    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", mappedBy="parent_widget", cascade={"persist"})
     * @ORM\OrderBy({"index" = "ASC"})
     */
    private $html_elements;

    public function __construct()
    {
        $this->html_elements = new ArrayCollection();
        $this->children = new ArrayCollection();
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
     * @return Widget
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
     * Set parentElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\Page $parentElement
     *
     * @return Widget
     */
    public function setParentElement(\Ymir\YmirTyrBundle\Entity\Page $parentElement = null)
    {
        $this->parent_element = $parentElement;

        return $this;
    }

    /**
     * Get parentElement
     *
     * @return \Ymir\YmirTyrBundle\Entity\Page
     */
    public function getParentElement()
    {
        return $this->parent_element;
    }

    /**
     * Set index
     *
     * @param integer $index
     *
     * @return Widget
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
     * Set parentPage
     *
     * @param \Ymir\YmirTyrBundle\Entity\Page $parentPage
     *
     * @return Widget
     */
    public function setParentPage(\Ymir\YmirTyrBundle\Entity\Page $parentPage = null)
    {
        $this->parent_page = $parentPage;

        return $this;
    }

    /**
     * Get parentPage
     *
     * @return \Ymir\YmirTyrBundle\Entity\Page
     */
    public function getParentPage()
    {
        return $this->parent_page;
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
     * Add child
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $child
     *
     * @return Widget
     */
    public function addChild(\Ymir\YmirTyrBundle\Entity\Widget $child)
    {
        $this->children[] = $child;

        return $this;
    }

    /**
     * Remove child
     *
     * @param \Ymir\YmirTyrBundle\Entity\Widget $child
     */
    public function removeChild(\Ymir\YmirTyrBundle\Entity\Widget $child)
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
     * Set metaWidget
     *
     * @param \Ymir\YmirTyrBundle\Entity\MetaWidget $metaWidget
     *
     * @return Widget
     */
    public function setMetaWidget(\Ymir\YmirTyrBundle\Entity\MetaWidget $metaWidget = null)
    {
        $this->meta_widget = $metaWidget;

        return $this;
    }

    /**
     * Get metaWidget
     *
     * @return \Ymir\YmirTyrBundle\Entity\MetaWidget
     */
    public function getMetaWidget()
    {
        return $this->meta_widget;
    }


    // Merge two sorted table
    public function sortElements() {
        $childrenCount = count($this->children);
        $html_elCount = count($this->html_elements);
        $childrenIndex = 0;
        $html_elIndex = 0;
        $table = array();
        $i = 0;
        // Both table are not empty
        while ($childrenIndex < $childrenCount && $html_elIndex < $html_elCount){
                // choosing the minimum
            if ($this->children[$childrenIndex]->index <= $this->html_elements[$html_elIndex]->index) {
                    $table[$i] = $this->children[$childrenIndex];
                    $childrenIndex ++;
            } else {
                    $table[$i] = $this->html_elements[$html_elIndex];
                    $html_elIndex ++;
            }
            $i++;
        }
        // At least one of the table is empty
        if ($childrenIndex >= $childrenCount){
            // we have to copy the remaing part of the table HTML ELement
            $table[$i] = $this->html_elements[$html_elIndex];
            $html_elIndex ++;
        } elseif ($html_elIndex >= $html_elCount) {
            // we have to copy the remaing part of the table Children
            $table[$i] = $this->children[$childrenIndex];
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
     * Add htmlElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement
     *
     * @return Widget
     */
    public function addHtmlElement(\Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement)
    {
        $this->html_elements[] = $htmlElement;

        return $this;
    }

    /**
     * Remove htmlElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement
     */
    public function removeHtmlElement(\Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement)
    {
        $this->html_elements->removeElement($htmlElement);
    }

    /**
     * Get htmlElements
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getHtmlElements()
    {
        return $this->html_elements;
    }
}
