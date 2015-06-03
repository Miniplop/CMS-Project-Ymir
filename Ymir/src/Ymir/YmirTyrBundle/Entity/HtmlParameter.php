<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;

/**
 * HtmlParameter
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class HtmlParameter
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
     * @ORM\Column(name="value", type="string", length=255)
     */
    private $value;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", inversedBy="parameters")
     * @ORM\JoinColumn(name="html_element_id", referencedColumnName="id")
     */
    private $html_element;

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
     * @return HtmlParameter
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
     * Set value
     *
     * @param string $value
     *
     * @return HtmlParameter
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
     * Set htmlElement
     *
     * @param \Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement
     *
     * @return HtmlParameter
     */
    public function setHtmlElement(\Ymir\YmirTyrBundle\Entity\HtmlElement $htmlElement = null)
    {
        $this->html_element = $htmlElement;

        return $this;
    }

    /**
     * Get htmlElement
     *
     * @return \Ymir\YmirTyrBundle\Entity\HtmlElement
     */
    public function getHtmlElement()
    {
        return $this->html_element;
    }
}
