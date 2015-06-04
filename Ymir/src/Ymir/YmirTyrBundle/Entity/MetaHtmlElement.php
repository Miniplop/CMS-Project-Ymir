<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;

/**
 * MetaHtmlElement
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class MetaHtmlElement
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
     * ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", mappedBy="meta_element")
     */
    //private $instances;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\MetaWidget", inversedBy="meta_html_elements")
     * @ORM\JoinColumn(name="meta_widget_id", referencedColumnName="id")
     */
    private $meta_widget;

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
     * Constructor
     */
    public function __construct()
    {
        //$this->instances = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set tag
     *
     * @param string $tag
     *
     * @return MetaHtmlElement
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
     * Add instance
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $instance
     *
     * @return MetaHtmlElement
     */
    public function addInstance(\Ymir\YmirTyrBundle\Entity\HtmlElement $instance)
    {
        $this->instances[] = $instance;

        return $this;
    }

    /**
     * Remove instance
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $instance
     */
    public function removeInstance(\Ymir\YmirTyrBundle\Entity\HtmlElement $instance)
    {
        $this->instances->removeElement($instance);
    }

    /**
     * Get instances
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getInstances()
    {
        return $this->instances;
    }

    /**
     * Set metaWidget
     *
     * @param \Ymir\YmirTyrBundle\Entity\MetaWidget $metaWidget
     *
     * @return MetaHtmlElement
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
}
