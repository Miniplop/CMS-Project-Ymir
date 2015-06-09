<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;

/**
 * Property
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Property
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
     * @var string
     *
     * @ORM\Column(name="inputType", type="string", length=255)
     */
    private $inputType;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="identifier", type="string", length=255)
     */
    private $identifier;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="text")
     */
    private $value;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", inversedBy="properties")
     * @ORM\JoinColumn(name="parent_element_id", referencedColumnName="id")
     */
    private $parentHtmlElement;

    public static function deserializeJson($params) 
    {
        $property = new Property();
        $property->setName($params["name"]);
        $property->setInputType($params["inputType"]);
        $property->setType($params["type"]);
        $property->setIdentifier($params["identifier"]);
        $property->setValue($params["value"]);

        return $property;
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
     * @return Property
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
     * Set inputType
     *
     * @param string $inputType
     *
     * @return Property
     */
    public function setInputType($inputType)
    {
        $this->inputType = $inputType;

        return $this;
    }

    /**
     * Get inputType
     *
     * @return string
     */
    public function getInputType()
    {
        return $this->inputType;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Property
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set identifier
     *
     * @param string $identifier
     *
     * @return Property
     */
    public function setIdentifier($identifier)
    {
        $this->identifier = $identifier;

        return $this;
    }

    /**
     * Get identifier
     *
     * @return string
     */
    public function getIdentifier()
    {
        return $this->identifier;
    }

    /**
     * Set value
     *
     * @param string $value
     *
     * @return Property
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
     * Set parentHtmlElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $parentHtmlElement
     *
     * @return Property
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
}
