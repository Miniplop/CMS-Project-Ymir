<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;

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
    private $parent_element;

    /**
     *  @ORM\Column(name="index", type="integer")
     */
    private $index;

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
}
