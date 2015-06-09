<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;

/**
 * CssProperty
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class CssProperty extends Property
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
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", inversedBy="cssProperties")
     * @ORM\JoinColumn(name="parent_element_id", referencedColumnName="id")
     */
    private $parentElement;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    public static function deserializeJson($params) 
    {
        $property = new CssProperty();
        $property->setName($params["name"]);
        $property->setInputType($params["inputType"]);
        $property->setType($params["type"]);
        $property->setIdentifier($params["identifier"]);
        $property->setValue($params["value"]);

        return $property;
    }

    /**
     * Set parentElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $parentElement
     *
     * @return CssProperty
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
}