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
     * @ORM\Column(name="balise", type="string", length=255)
     */
    private $balise;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\MetaWidget", mappedBy="html_element")
     */
    protected $meta_widgets;

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
}
