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
     * @ORM\Column(name="value", type="text")
     */
    private $value;

    /**
     * @var boolean
     *
     * @ORM\Column(name="mapped", type="boolean")
     */
    private $mapped;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\HtmlElement", inversedBy="htmlParameters")
     * @ORM\JoinColumn(name="html_element_id", referencedColumnName="id", nullable=false)
     */
    private $htmlElement;


    public static function deserializeJson($params) 
    {
        $htmlParameter = new HtmlParameter();
        $htmlParameter->setName($params["name"]);
        $htmlParameter->setValue($params["value"]);
        if(array_key_exists("mapped", $params)) {
            $htmlParameter->setMapped($params["mapped"]);
        } else {
            $htmlParameter->setMapped(true);
        }
        
        return $htmlParameter;
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
     * Set mapped
     *
     * @param boolean $mapped
     *
     * @return HtmlParameter
     */
    public function setMapped($mapped)
    {

        if($mapped)
            $this->mapped = 1;
        else
            $this->mapped = 0;

        return $this;
    }

    /**
     * Get mapped
     *
     * @return boolean
     */
    public function getMapped()
    {
        return $this->mapped;
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
        $this->htmlElement = $htmlElement;

        return $this;
    }

    /**
     * Get htmlElement
     *
     * @return \Ymir\YmirTyrBundle\Entity\HtmlElement
     */
    public function getHtmlElement()
    {
        return $this->htmlElement;
    }
}
